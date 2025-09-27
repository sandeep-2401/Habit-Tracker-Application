export default function UserInfoCard({ user, vertical }) {
  return (
    <div className={`flex ${vertical ? "flex-col items-center" : "flex-row items-center"} gap-4 w-full`}>
      
      {/* Avatar */}
      <div className={`${vertical ? "w-32 h-32 mb-6" : "w-16 h-16"} rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-5xl`}>
        {user.username ? user.username[0].toUpperCase() : "U"}
      </div>

      {/* Info */}
      <div className={`text-center ${!vertical && "text-left"}`}>
        <h1 className="text-2xl font-bold">{user.username}</h1>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-500 italic">{user.bio || "No bio added yet"}</p>
      </div>
    </div>
  );
}
