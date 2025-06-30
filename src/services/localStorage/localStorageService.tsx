// Interfaces para tipagem, se estiver usando TypeScript
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  projeto?: Projeto; // Projeto é opcional aqui caso nem todo user tenha um
}

interface Projeto {
  nome: string;
  url: string;
  corHex: string;
  dashUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthResponse {
  accessToken: string;
  accessTokenExpireIn: string;
  refreshToken: string;
  refreshTokenExpireIn: string;
  user: User;
}

// Chaves de armazenamento no localStorage
const LOCAL_STORAGE_KEYS = {
  AUTH_DATA: 'auth_data', // Para guardar todo o objeto de autenticação
  ACCESS_TOKEN: 'access_token', // << Esta é a chave esperada pelo service para o token
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data', // << Esta é a chave esperada pelo service para o user
  PROJECT_DATA: 'project_data',
  THEME_COLOR: 'theme_color',
  DASHBOARD_URL: 'dashboard_url', // << Esta é a chave esperada pelo service para a URL da dash
};

class LocalStorageService {
  /**
   * Salva todos os dados de autenticação recebidos do login.
   * @param authData Os dados de resposta do login.
   */
  setAuthData(authData: AuthResponse): void {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_DATA, JSON.stringify(authData));
      localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, authData.accessToken); // << Salva usando LOCAL_STORAGE_KEYS.ACCESS_TOKEN
      localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, authData.refreshToken);
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER_DATA, JSON.stringify(authData.user)); // << Salva usando LOCAL_STORAGE_KEYS.USER_DATA
      
      if (authData.user.projeto) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.PROJECT_DATA, JSON.stringify(authData.user.projeto));
        localStorage.setItem(LOCAL_STORAGE_KEYS.THEME_COLOR, authData.user.projeto.corHex);
        localStorage.setItem(LOCAL_STORAGE_KEYS.DASHBOARD_URL, authData.user.projeto.dashUrl); // << Salva usando LOCAL_STORAGE_KEYS.DASHBOARD_URL
      }
    } catch (error) {
      console.error("Erro ao salvar dados de autenticação no localStorage:", error);
    }
  }

  /**
   * Obtém o token de acesso.
   * @returns string | null
   */
  getAccessToken(): string | null {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  }

  /**
   * Obtém o token de refresh.
   * @returns string | null
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
  }

  /**
   * Obtém os dados do usuário.
   * @returns User | null
   */
  getUser(): User | null {
    try {
      const userData = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Erro ao obter dados do usuário do localStorage:", error);
      return null;
    }
  }

  /**
   * Obtém os dados do projeto do usuário.
   * @returns Projeto | null
   */
  getProject(): Projeto | null {
    try {
      const projectData = localStorage.getItem(LOCAL_STORAGE_KEYS.PROJECT_DATA);
      return projectData ? JSON.parse(projectData) : null;
    } catch (error) {
      console.error("Erro ao obter dados do projeto do localStorage:", error);
      return null;
    }
  }

  /**
   * Obtém a cor hexadecimal do projeto.
   * @returns string | null
   */
  getProjectColor(): string | null {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.THEME_COLOR);
  }

  /**
   * Obtém a URL do dashboard do projeto.
   * @returns string | null
   */
  getDashboardUrl(): string | null {
    console.log(localStorage.getItem(LOCAL_STORAGE_KEYS.DASHBOARD_URL))
    return localStorage.getItem(LOCAL_STORAGE_KEYS.DASHBOARD_URL);
  }

  /**
   * Limpa todos os dados de autenticação e usuário do localStorage (útil para logout).
   */
  clearAuthData(): void {
    try {
      Object.values(LOCAL_STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error("Erro ao limpar dados do localStorage:", error);
    }
  }
}

// Exporta uma instância única do serviço
export const localStorageService = new LocalStorageService();