import React from 'react';
import { Modal } from '@material-ui/core';
import styled from 'styled-components';

import Search from './Search';

const StyledSearchModalContainerDiv = styled.div`
  width: 610px;
`

export default function SearchModal({ isOpen, close }) {
  return (
    <Modal className="px-6 md:px-0 flex justify-center items-start mt-24 md:mt-40" open={isOpen} onClose={close} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" >
      <StyledSearchModalContainerDiv className="bg-black p-6 h-auto rounded-md border-">
        <Search closeModal={close} />
      </StyledSearchModalContainerDiv>
    </Modal>
  )
}
