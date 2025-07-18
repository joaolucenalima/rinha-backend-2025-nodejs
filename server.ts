import { createServer, IncomingMessage } from "node:http"

const PORT = 3000

function getReqBody<T>(req: IncomingMessage): Promise<T> {
  return new Promise((resolve, reject) => {
    let data = ""
    req.on("data", chunk => {
      data += chunk
    })

    req.on("end", () => {
      try {
        resolve(JSON.parse(data))
      } catch (err) {
        console.error(err)
        reject(err)
      }
    })

    req.on("error", err => {
      reject(err)
    })
  })
}

const server = createServer(async (req, res) => {
  if (req.method === "POST" &&  req.url === "/payments") {
    interface PaymentsBody { 
      correlationId: string,
      amount: number
    }

    const body = await getReqBody<PaymentsBody>(req)

    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end(JSON.stringify(body))
  }
})

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`)
})