import "dotenv/config"

const envVariables = {
  APP_PORT: "", 
  PROCESSOR_DEFAULT_URL: "",
  PROCESSOR_FALLBACK_URL: ""
}

Object.keys(envVariables).forEach(variable => {
  const value = process.env[variable]

  if (!value) {
    throw new Error(`Esqueceu de colocar a variável ${variable} no .env aí, parceiro`)
  }

  envVariables[variable as keyof typeof envVariables] = value
})

export default envVariables