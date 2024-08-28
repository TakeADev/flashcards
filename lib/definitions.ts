export namespace User {
  export interface DBUser {
    id: string;
    email: string;
    displayName: string;
    collections: string[];
    password: string;
  }

  export interface ClientUser {
    id: string;
    email: string;
    displayName: string;
    collections: string[];
  }
}
