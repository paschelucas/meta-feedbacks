export const goBack = (Navigate) => {
  Navigate(-1);
};

export const goToLogin = (Navigate) => {
  Navigate("/login");
};

export const goToSingUp = (Navigate) => {
  Navigate("/cadastro");
};

export const goToHome = (Navigate) => {
  Navigate("/")
};

export const goToMenu = (Navigate) => {
  Navigate("/menu")
};

export const goToLeaguersList = (Navigate) => {
  Navigate("/leaguers")
};

export const goToLeaguersSignup = (Navigate) => {
  Navigate("/leaguers/cadastro")
};

export const goToLeaguerProfile = (Navigate) => {
  Navigate("/leaguers/profile");
};

export const goToColaboratorsList = (Navigate) => {
  Navigate("/colaboradores")
};

export const goToEvaluationProcess = (Navigate) => {
  Navigate("/avaliacao")
};

export const goToProjetc = (Navigate) => {
  Navigate("/projetos")
};