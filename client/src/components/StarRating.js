import React from 'react'
import Rating from '@material-ui/lab/Rating'
import styled from 'styled-components';

const StyledRatingsDiv = styled.div`
  .MuiRating-root {
    font-size: 2.4em;
    ${props => props.readOnly ? 'font-size: var(--fz-xl);' : 'font-size: 2.4em;'}
  }
  
  .MuiRating-iconEmpty {
    .MuiSvgIcon-root {
      ${props => props.readOnly ? 'fill: none;' : 'fill: var(--primary);'}
      opacity: .1;
    }
  }

  .MuiRating-iconFilled {
    .MuiSvgIcon-root {
      ${props => props.readOnly ? 'fill: var(--opacity-primary);' : 'fill: var(--primary);'}
    }
  }

  .MuiRating-iconActive {
    transform: scale(1)
  }
`;

export default function StarRating({ rating, onChange, readOnly }) {
  return (
    <StyledRatingsDiv readOnly={readOnly}>
      <Rating name="hover-feedback" value={rating} precision={0.5} readOnly={readOnly || false} onChange={onChange} />
    </StyledRatingsDiv>
  )
}
