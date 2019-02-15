import React from 'react';

const Main = props => <div>
    <input name="url"
        placeholder="create message"
        onChange={
            ev => props.changeUrlInput(ev)
        } />
    <button onClick={
        () => {
            props.addMessage({
                to: 1, // 0 = all, 1 = admins, n = userID
                level: 'info',
                text: `pushed button`
            })

        }
    }>send</button>
    <ul>
        {props.messages.map(message => <li>{message.text}</li>)}
    </ul>
</div>

export default Main;