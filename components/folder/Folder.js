import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    position: relative;
    background-image: url(${'/img/FolderPng.png'});
    background-repeat:no-repeat;
    color: white;
    height:100%;
`

const Center = styled.div`
    padding-top:48%;
    padding-left:5%;
`

const Wrapper = styled.div`
    background-image: url(${'/img/FolderPng.png'});
    position: relative;
    height:96%;
    width:275px;
`

const Folder = () => {
    return (
        <Container>
            <Center>
                <div>XYZ</div>
                <div style={{marginBottom:'10px'}}>Empty folder</div>
            </Center>
        </Container>
    )
}

export default Folder