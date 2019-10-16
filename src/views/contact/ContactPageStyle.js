import styled from '@datapunt/asc-core';
import { themeColor } from '@datapunt/asc-ui';
import { ContentBoxStyle } from '../../styles/SharedStyles';

export const ContactPageStyle = styled.div`
  width: 100%;

  p > a {
    color: ${themeColor('secondary')};
  }
`;

export const ContentStyle = styled(ContentBoxStyle)`
  h3 {
    font-size: 20px;
    line-height: 20px;

    color: ${themeColor('secondary')};
  }
`;

export const EmailLinkStyle = styled.a`
  color: ${themeColor('tint', 'level7')};

  svg {
    height: 12px;
    transform: rotate(180deg);
    margin-right: -5px;
    margin-left: -11px;
  }

  &:hover {
    color: ${themeColor('secondary')};

    svg {
      fill: ${themeColor('secondary')};
    }
  }
`;

export default ContactPageStyle;
