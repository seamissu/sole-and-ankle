import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.

  const variant =
    typeof salePrice === 'number'
      ? 'on-sale'
      : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default';

  const FLAGS = {
    'on-sale': {
      '--width': 49 + 'px',
      '--height': 32 + 'px',
      '--color': `${COLORS.white}`,
      '--backgroundColor': `${COLORS.primary}`,
      '--fontSize': 14 + 'px',
      '--fontWeight': `${WEIGHTS.medium}`,
      text: 'Sale',
    },
    'new-release': {
      '--width': 118 + 'px',
      '--height': 32 + 'px',
      '--color': `${COLORS.white}`,
      '--backgroundColor': `${COLORS.secondary}`,
      '--fontSize': 14 + 'px',
      '--fontWeight': `${WEIGHTS.medium}`,
      text: 'Just Released!',
    },
    default: {
      text: '',
    },
  };

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          <Flag style={FLAGS[variant]}>{FLAGS[variant].text}</Flag>
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price isOnSale={variant === 'on-sale'}>
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          <SalePrice>
            {salePrice ? formatPrice(salePrice) : undefined}
          </SalePrice>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 275px;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Flag = styled.div`
  position: absolute;
  top: 12px;
  right: -6px;
  width: var(--width);
  height: var(--height);
  color: var(--color);
  background-color: var(--backgroundColor);
  font-size: var(--fontSize);
  font-weight: var(--fontWeight);
  border-radius: 2px;
  padding: 6px 10px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: ${(prop) =>
    prop.isOnSale ? 'line-through' : undefined};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
