import { useState } from "react";
import { api } from "../../api/api";

export default function ModerationActions({ userId }) {
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!userId) {
    return (
      <div className="p-4 text-gray-400">
        Enter a user ID to perform moderation actions.
      </div>
    );
  }

  async function runAction(type) {
    setLoading(true);
    setMessage("");

    const payload = {
      userId,
      reason: reason || "No reason provided",
    };

    let res;

    if (type === "warn") res = await api.bot.mod.warn(payload);
    if (type === "promote") res = await api.bot.mod.promote(payload);
    if (type === "demote") res = await api.bot.mod.demote(payload);
    if (type === "kick") res = await api.bot.mod.kick(payload);

    if (!res || res.error) {
      setMessage(res?.error || "Action failed");
    } else {
      setMessage(`Successfully executed: ${type.toUpperCase()}`);
    }

    setLoading(false);
  }

  return (
    <div className="p-4 bg-gray-900 border border-gray-700 rounded">
      <h2 className="text-lg font-bold mb-3 text-white">
        Moderation Actions for {userId}
      </h2>

      {/* REASON INPUT */}
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Reason (optional)"
        className="w-full p-2 mb-3 bg-gray-800 border border-gray-700 text-gray-200"
      />

      {/* ACTION BUTTONS */}
      <div className="flex flex-wrap gap-3 mb-3">
        <button
          onClick={() => runAction("warn")}
          disabled={loading}
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white"
        >
          Warn
        </button>

        <button
          onClick={() => runAction("promote")}
          disabled={loading}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white"
        >
          Promote
        </button>

        <button
          onClick={() => runAction("demote")}
          disabled={loading}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white"
        >
          Demote
        </button>

        <button
          onClick={() => runAction("kick")}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          Kick
        </button>
      </div>

      {/* RESULT MESSAGE */}
      {message && (
        <div className="text-gray-300 text-sm">{message}</div>
      )}
    </div>
  );
}
