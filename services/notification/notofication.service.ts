export const notify = (pushToken: string, title: string, message: string) => {
    fetch(
        `https://exp.host/--/api/v2/push/send`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip, deflate',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: pushToken,
                title: title,
                body: message
            })
        }
    );
}
