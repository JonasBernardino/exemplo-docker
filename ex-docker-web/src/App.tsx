import { type FormEvent, useState } from 'react'
import './App.css'

type CepResponse = {
  cep: string
  logradouro: string
  complemento: string
  unidade: string
  bairro: string
  localidade: string
  uf: string
  estado: string
  regiao: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

function App() {
  const [cep, setCep] = useState('')
  const [endereco, setEndereco] = useState<CepResponse | null>(null)
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function buscarCep(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const cepNumerico = cep.replace(/\D/g, '')

    if (cepNumerico.length !== 8) {
      setEndereco(null)
      setErro('Informe um CEP com 8 digitos.')
      return
    }

    setCarregando(true)
    setErro('')
    setEndereco(null)

    try {
      const response = await fetch(`http://localhost:8080/cep/${cepNumerico}`)

      if (!response.ok) {
        throw new Error('Nao foi possivel consultar esse CEP.')
      }

      const data = (await response.json()) as CepResponse
      setEndereco(data)
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : 'Nao foi possivel consultar esse CEP.',
      )
    } finally {
      setCarregando(false)
    }
  }

  return (
    <main className="app">
      <section className="consulta">
        <form className="formulario" onSubmit={buscarCep}>
          <label className="sr-only" htmlFor="cep">
            CEP
          </label>
          <div className="campo-busca">
            <input
              id="cep"
              name="cep"
              inputMode="numeric"
              maxLength={9}
              placeholder="58028-230"
              value={cep}
              onChange={(event) => setCep(event.target.value)}
            />
            <button type="submit" disabled={carregando}>
              {carregando ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
        </form>

        {erro && <p className="mensagem-erro">{erro}</p>}

        {endereco && (
          <div className="resultado">
            <h2>{endereco.cep}</h2>
            <dl>
              <div>
                <dt>Logradouro</dt>
                <dd>{endereco.logradouro || 'Nao informado'}</dd>
              </div>
              <div>
                <dt>Bairro</dt>
                <dd>{endereco.bairro || 'Nao informado'}</dd>
              </div>
              <div>
                <dt>Cidade</dt>
                <dd>
                  {endereco.localidade} - {endereco.uf}
                </dd>
              </div>
              <div>
                <dt>Estado</dt>
                <dd>{endereco.estado}</dd>
              </div>
              <div>
                <dt>Regiao</dt>
                <dd>{endereco.regiao}</dd>
              </div>
              <div>
                <dt>DDD</dt>
                <dd>{endereco.ddd || 'Nao informado'}</dd>
              </div>
              <div>
                <dt>IBGE</dt>
                <dd>{endereco.ibge || 'Nao informado'}</dd>
              </div>
              <div>
                <dt>SIAFI</dt>
                <dd>{endereco.siafi || 'Nao informado'}</dd>
              </div>
            </dl>
          </div>
        )}
      </section>
    </main>
  )
}

export default App
