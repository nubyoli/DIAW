import { Link } from 'react-router-dom';
import { listarNaRoca } from '../services/votacaoService';
import ParticipanteCard from '../components/ParticipanteCard';
import { listarNaRoca, listarForaDaRoca, registrarVoto } from '../services/votacaoService';

export default function Resultado(){
    const [votos, setVotos] = useState(()=> obterVotos());

    const total = calcularTotalVotos(votos);
    const resultado = calcularResultado(votos);

    return (
        <div className="barra">
            <div className="barra-preenchida" style={{width: `${participante.percentual}%`}} />
        </div>
    );
}