import { $host } from './index.ts';

/**
 * Схема запрашиваемого объекта персонажа.
 */
type CharacterSchema = {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: string;
    image: string;
    episode: string[];
    url: string;
    created: string;
}

/**
 * Схема ответа API на запрос всех или отфильтрованных
 * персонажей. В поле _info_ свойства _next_ и _prev_ 
 * хранят ссылки на предыдущую и следующую страницы
 * соответственно. 
 */
type CharacterResponse = {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: CharacterSchema[];
}

/**
 * Функция возвращает первую страницу всех персонажей
 * со ссылкой на следующую страницу.
 * {@link fetchNextPage} - функция для получения страницы по ссылке.
 */
export const fetchAllCharacters = 
async (): Promise<CharacterResponse> => {
    const { data } = await $host.get('/character')
    return data;
}

type TypeFilters = {
    name?: string;
    status?: 'alive' | 'dead' | 'unknown';
    species?: string;
    type?: string;
    gender?: 'male' | 'female' | 'genderless' | 'unknown';
}

/**
 * Функция возвращает первую страницу отфильтрованных 
 * персонажей со ссылкой на следующую страницу.
 * {@link fetchNextPage} - функция для получения страницы по ссылке.
 */
export const fetchFilteredCharacters = 
async (filters : TypeFilters): Promise<CharacterResponse> => {
    const { data } = await $host.get('/character', { params: filters });
    return data;
}

/**
 * Функция возвращает страницу списка запрошенных ранее персонажей 
 * по переданной в запросе ссылке.
 */
export const fetchCharacterPage = async (page: string) => {
    const response = await fetch(page);
    const body: CharacterResponse = await response.json(); 
    return body;
}

/**
 * Функция возвращает объект персонажа по запрошенному 
 * идентификатору.
 */
export const fetchCharacter = async (id: number): Promise<CharacterSchema> => {
    const {data} = await $host.get(`/character/${id}`);
    return data;
}

/**
 * Функция возвращает массив персонажей с переданными  
 * в запросе идентификаторами.
 */
export const fetchMultipleCharacters = 
async (characterIds?: number[]): Promise<CharacterSchema[]> => {
    const { data } = await $host.get(`/character/${characterIds.join(',') || ''}`)
    return data;
}
