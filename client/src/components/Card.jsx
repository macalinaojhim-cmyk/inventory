import { Box } from "lucide-react"

export default function ({ title, content, icon }) {
    return (
        <div>
            <div className="card">
                {icon}
                <h2>{title}</h2>
                <p className='num' >{content}</p>
            </div>
        </div>
    )
}