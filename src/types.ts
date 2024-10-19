// src/types.ts
export interface User {
    login: string;
    avatarUrl: string;
    url: string;
}
  
export interface Repository {
    name: string;
    description: string | null;
    url: string;
}
  
export interface UserReposData {
  user: {
    repositories: {
      edges: Array<{
        node: Repository;
      }>;
      pageInfo: {
        endCursor: string | null;
        hasNextPage: boolean;
      };
    };
  };
}


// src/types.ts
export interface Repository {
    name: string;
    description: string | null;
    url: string;
  }
  
  export interface UserReposData {
    user: {
      repositories: {
        edges: Array<{
          node: Repository;
        }>;
        pageInfo: {
          endCursor: string | null;
          hasNextPage: boolean;
        };
      };
    };
  }
  
  export interface UserReposVars {
    username: string;
    after?: string | null;
  }
  