import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticipanteCard from '../components/ParticipanteCard';
import { listarNaRoca, listarForaDaRoca, registrarVoto } from '../services/votacaoService';

export default function Votacao() {
  const [ultimoVoto, setUltimoVoto] = useState(null);
  const [quantidadeVotos, setQuantidadeVotos] = useState(0);
  const [erro, setErro] = useState('');
  const naRoca = listarNaRoca();
  const foraDaRoca = listarForaDaRoca();

  function handleVotar(participante) {
    try {
      registrarVoto(participante.id);
      setUltimoVoto(participante);
      setQuantidadeVotos((quantidade) => quantidade + 1);
      setErro('');
    } catch {
      setErro('Não foi possível salvar o voto. Verifique o armazenamento do navegador.');
    }
  }

  return (
    <main className="pagina">
      <h1>Quem você quer eliminar?</h1>
      <p className="introducao">Cada clique conta um voto para tirar o peão da fazenda.</p>
      <div className="grade-roca">
        {naRoca.map((participante) => (
          <ParticipanteCard key={participante.id} participante={participante} onVotar={handleVotar} />
        ))}
      </div>
      {erro && <p role="alert" className="mensagem-erro">{erro}</p>}
      {ultimoVoto !== null && (
        <p className="confirmacao" role="status">
          Voto registrado para eliminar <strong>{ultimoVoto.nome}</strong>! Você já votou{' '}
          <strong>{quantidadeVotos} {quantidadeVotos === 1 ? 'vez' : 'vezes'}</strong> nesta página.{' '}
          <Link to="/resultado">Ver parcial</Link>
        </p>
      )}
      <section className="demais-peoes">
        <h2>Demais peões</h2>
        <p>Fora da roça nesta semana, não podem receber votos.</p>
        <div className="grade-participantes">
          {foraDaRoca.map((participante) => (
            <ParticipanteCard key={participante.id} participante={participante} />
          ))}
        </div>
      </section>
    </main>
  );
}
