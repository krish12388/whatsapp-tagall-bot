const makeWASocket = require("@whiskeysockets/baileys").default
const { useMultiFileAuthState } = require("@whiskeysockets/baileys")
const qrcode = require("qrcode-terminal")

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("baileys_auth")
    const sock = makeWASocket({
        printQRInTerminal: false,
        auth: state,
        // ✅ Force QR login instead of pairing code
        browser: ["Chrome (Linux)", "Chrome", "1.0.0"],
        syncFullHistory: false
    })

    sock.ev.on("connection.update", (update) => {
        const { connection, qr } = update

        if (qr) {
            console.clear()
            console.log("📱 Scan this QR with WhatsApp → Linked Devices:")
            qrcode.generate(qr, { small: true })
        }

        if (connection === "open") {
            console.log("✅ Bot linked successfully! Ready for !tagall")
        }

        if (connection === "close") {
            console.log("❌ Connection closed. Restarting...")
            startBot() // auto-reconnect
        }
    })

    sock.ev.on("creds.update", saveCreds)

    // Group command listener
    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0]
        if (!msg.message) return

        const jid = msg.key.remoteJid
        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            ""

        // Only run in groups
        if (!jid.endsWith("@g.us")) return

        // !tagall command
        if (text.toLowerCase().startsWith("!tagall")) {
            try {
                const groupMetadata = await sock.groupMetadata(jid)
                const participants = groupMetadata.participants.map(p => p.id)

                const extra = text.slice("!tagall".length).trim()
                const mentionText =
                    (extra ? extra + "\n\n" : "") +
                    participants.map(p => "@" + p.split("@")[0]).join(" ")

                await sock.sendMessage(jid, {
                    text: mentionText,
                    mentions: participants
                })
            } catch (e) {
                console.error("Tagall error:", e)
                await sock.sendMessage(jid, { text: "⚠️ Could not tag all members." })
            }
        }
    })
}

startBot()
const express = require("express")
const app = express()

app.get("/", (req, res) => {
  res.send("✅ WhatsApp Bot is running!")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`🌐 Web server running on port ${PORT}`))