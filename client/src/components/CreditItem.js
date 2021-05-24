import React from 'react'
import styled from 'styled-components';

const StyledCreditNameDiv = styled.div`
  &:before {
    float: left;
    width: 0;
    white-space: nowrap;
    color: var(--opacity-1);
    letter-spacing: .1em;
    content: "............................................................................";
  }
`;

export default function CreditItem({ name, role }) {
  return (
    <div className="mx-0 sm:mx-3 grid grid-cols-2 mb-2">
      <StyledCreditNameDiv className="overflow-x-hidden"><span className="bg-black pr-4 font-medium  text-sm">{name}</span></StyledCreditNameDiv>
      <div className="bg-black"><span className="bg-black block ml-6 text-opacity-2 font-medium text-sm">{role}</span></div>
    </div>
  )
}
