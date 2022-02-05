import {observer} from 'mobx-react';
import React from 'react';
import {Alert} from 'react-bootstrap';
import styled from 'styled-components';

interface MessageProps {
    show: boolean;
    text: string;
    variant?: string;
    dismissible?: boolean;
    onClose?: () => void;
}

const MessageDiv = styled(Alert)`
    margin: 10px 0;
`;

export const Message = observer((props: MessageProps): React.ReactElement<MessageProps> => {
    const {show, text, variant = 'danger', dismissible = false, onClose} = props;

    return show ? (
        <MessageDiv
            style={{margin: '10px 0'}}
            variant={variant}
            onClose={onClose}
            dismissible={dismissible}>
            <p>{text}</p>
        </MessageDiv>
    ) : (
        <></>
    );
});
