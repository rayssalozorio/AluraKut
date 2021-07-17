import Box from "../src/components/Box";
import MainGrid from "../src/components/MainGrid";
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
// fazendo um componente, usar sempre o nome Maisuculo
// pode conter css, js, html:

function ProfileSidebar(props) {
  return (
    <Box>
      <img
        style={{ borderRadius: `8px` }}
        src={`https://github.com/${props.githubUser}.png`}
      />
    </Box>
  );
}
export default function Home() {
  const githubUser = "rayssalozorio";
  const pessoasFavoritas = [
    "yurilozorio",
    "juunegreiros",
    "peas",
    "omariosouto",
    "rafaballerini",
    "marcobrunodev",
  ];
  return (
    // no style tem que colocar o {} e abrir outro {}=objeto pra declarar
    //as propriedades que esta usando: fica assim: style={{}}
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: `profileArea` }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: `welcomeArea` }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: `profileRelationsArea` }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className="smalltTitle">
              Pessoas da Comunidade({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`http://github.com/${itemAtual}.png`}></img>
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
