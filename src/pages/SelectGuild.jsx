import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api.js";

function SelectGuild() {
  const navigate = useNavigate();

  const [guilds, setGuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /**
   * Fetch guilds on mount
   */
  useEffect(() => {
    const fetchGuilds = async () => {
      try {
        const data = await api.guilds.list();

        if (!data?.success) {
          setError("Failed to load guilds.");
          setLoading(false);
          return;
        }

        setGuilds(data.guilds || []);
        setLoading(false);
      } catch (err) {
        console.error("Guild fetch error:", err);
        setError("Unable to fetch guilds.");
        setLoading(false);
      }
    };

    fetchGuilds();
  }, []);

  /**
   * Handle guild selection
   */
  const selectGuild = (guildId) => {
    localStorage.setItem("guildId", guildId);
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white text-xl">
        Loading your servers...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-400 text-xl">
        {error}
      </div>
    );
  }

  if (guilds.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white">
        <h1 className="text-2xl font-bold mb-4">No Manageable Servers Found</h1>
        <p className="text-gray-400">
          You must have <strong>Manage Server</strong> permissions and the bot must be in the server.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Select a Server
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {guilds.map((guild) => (
          <div
            key={guild.id}
            onClick={() => selectGuild(guild.id)}
            className="cursor-pointer bg-[#1a1a1a] p-6 rounded-xl border border-[#333] hover:border-[#5865F2] hover:bg-[#111] transition"
          >
            <div className="flex items-center gap-4">
              {guild.icon ? (
                <img
                  src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=128`}
                  alt={guild.name}
                  className="w-16 h-16 rounded-full"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-[#333] flex items-center justify-center text-xl">
                  {guild.name?.charAt(0) || "?"}
                </div>
              )}

              <div>
                <h2 className="text-xl font-semibold">{guild.name}</h2>
                <p className="text-gray-400 text-sm">Click to manage</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectGuild;
