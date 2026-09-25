

export default function ({ title, content }) {
    return (
        <div>
            <div className="card">
                <h2>{title}</h2>
                <p className='num' >{content}</p>
            </div>
        </div>
    )
}