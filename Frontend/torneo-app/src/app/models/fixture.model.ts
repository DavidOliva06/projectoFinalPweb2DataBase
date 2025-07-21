// Define la estructura de un Equipo, tal como lo devuelve la API
export interface Team {
  id: number;
  name: string;
  logo_url?: string; // El logo es opcional
}

// Define la estructura de un Partido (Fixture)
export interface Fixture {
  id: number;
  team1: Team; // El equipo local es un objeto anidado de tipo Team
  team2: Team; // El equipo visitante también
  date: string; // La fecha viene como un string ISO
  // Podrías añadir más campos aquí si tu API los devuelve (ej: score_home)
}