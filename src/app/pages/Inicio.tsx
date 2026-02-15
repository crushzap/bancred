import HeroInicio from '../components/inicio/HeroInicio'
import RodapeSite from '../components/inicio/RodapeSite'
import SecaoModalidades from '../components/inicio/SecaoModalidades'
import SecaoProcesso from '../components/inicio/SecaoProcesso'

export default function Inicio() {
  return (
    <div className="inicio">
      <HeroInicio />
      <SecaoModalidades />
      <SecaoProcesso />
      <RodapeSite />
    </div>
  )
}
