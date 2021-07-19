import React from "react";
import Box from "../src/components/Box";
import MainGrid from "../src/components/MainGrid";
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
  AlurakutProfileSidebarMenuDefault,
} from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
// fazendo um componente, usar sempre o nome Maisuculo
// pode conter css, js, html:

function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img
        style={{ borderRadius: `8px` }}
        src={`https://github.com/${props.githubUser}.png`}
      />
      <hr />
      <p>
        <a className="boxLink" href={`http://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>
      <ul>
        {/* {seguidores.map((itemAtual) => {
          return (
            <li key={itemAtual}>
              <a href={`https://github.com/${itemAtual}.png`}>
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })} */}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}
export default function Home() {
  const githubUser = "rayssalozorio";
  const [comunidades, setComunidades] = React.useState([
    {
      id: "34709324789247589",
      title: "Eu odeio acordar cedo",
      image: "https://alurakut.vercel.app/capa-comunidade-01.jpg",
    },
  ]);
  const pessoasFavoritas = [
    "yurilozorio",
    "juunegreiros",
    "peas",
    "omariosouto",
    "rafaballerini",
    "marcobrunodev",
    //"felipefialho",
  ];
  const [seguidores, setSeguidores] = React.useState([]);
  React.useEffect(function () {
    fetch("https://api.github.com/users/peas/followers")
      .then(function (respostaDoServidor) {
        respostaDoServidor.json();
      })
      .then(function (respostaCompleta) {
        console.log(respostaCompleta);
      });
  }, []);

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

          <Box>
            <h2 className="subTitle">O que você deseja fazer</h2>
            <form
              onSubmit={function handleCriaComunidade(e) {
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);
                const comunidade = {
                  id: new Date().toISOString,
                  title: dadosDoForm.get("title"),
                  image: dadosDoForm.get("image"),
                };
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas);
              }}
            >
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos como capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos como capa"
                />
                <button>Criar comunidade</button>
              </div>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: `profileRelationsArea` }}
        >
          <ProfileRelationsBox title="Seguidores" items={seguidores} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade(
              {pessoasFavoritas.length <= 6 ? pessoasFavoritas.length : "6+"})
            </h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li id={itemAtual}>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`http://github.com/${itemAtual}.png`}></img>
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades({comunidades.length})</h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`}>
                      <img src={itemAtual.image}></img>
                      <span>{itemAtual.title}</span>
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
