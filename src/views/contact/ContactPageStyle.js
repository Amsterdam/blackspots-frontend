import styled from 'styled-components';
import { themeColor, themeSpacing, Heading } from '@amsterdam/asc-ui';
import { ContentBoxStyle } from '../../styles/SharedStyles';

const ContactPageStyle = styled.div`
  width: 100%;
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

export const HeadingStyle = styled(Heading)`
  margin: ${themeSpacing(5)} 0;
`;

export default ContactPageStyle;
