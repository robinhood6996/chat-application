import gravatarUrl from "gravatar-url";

export default function ChatHead({ message }) {
    console.log('object', message);
    const {receiver} = message || {};
    const {name, email} = receiver || {};
    return (
        <div className="relative flex items-center p-3 border-b border-gray-300">
            <img
                className="object-cover w-10 h-10 rounded-full"
                src={gravatarUrl(email, {size: 80})}
                alt={name}
            />
            <span className="block ml-2 font-bold text-gray-600">{name}</span>
        </div>
    );
}
