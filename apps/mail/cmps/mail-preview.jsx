const { useState, useEffect, Fragment } = React

export function MailPreview({ mail }) {
    const [isExpanded, setIsExpanded] = useState(false)

    function shortBody(textBody) {
        if (textBody.length > 30) return textBody.substring(0, 30) + '...'
        else return textBody.substring(0, textBody.length) + '...'
    }

    function shortEmail(mail) {
        if (mail.length > 12) return mail.substring(0, 12)
        else return mail.substring(0, mail.length)
    }

    function starMsg(id) {
        console.log(id);
    }

    return <Fragment>
        <tr onClick={() => {
            setIsExpanded(!isExpanded)
        }}>
            <td className="left-side">
                <button onClick={() => starMsg(mail.id)}>star</button>
                <button>select</button>
                <p>{mail.subject}</p>
            </td>
            <td>
                <p>{shortBody(mail.body)}</p>
            </td>
            <td>
                <button>star</button>
                <button>select</button>
            </td>


        </tr>
        <tr hidden={!isExpanded}>
            <td colSpan="3">
                <div>{mail.body}</div>

            </td>
        </tr>
    </Fragment>
}