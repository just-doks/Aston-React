import { $host } from './index.ts';
import { CHARACTER_ENDPOINT } from 'src/utils/constants.ts';

import type {
    CharacterSchema,
    CharacterResponse,
    TypeFilters
} from './characterTypes.ts';

/**
 * Функция возвращает первую страницу всех персонажей
 * со ссылкой на следующую страницу.
 * {@link fetchNextPage} - функция для получения страницы по ссылке.
 */
export const fetchAllCharacters = 
async (): Promise<CharacterResponse> => {
    const { data } = await $host.get(CHARACTER_ENDPOINT)
    return data;
}

/**
 * Функция возвращает первую страницу отфильтрованных 
 * персонажей со ссылкой на следующую страницу.
 * {@link fetchNextPage} - функция для получения страницы по ссылке.
 */
export const fetchFilteredCharacters = 
async (filters : TypeFilters): Promise<CharacterResponse> => {
    const { data } = await $host.get(CHARACTER_ENDPOINT, { params: filters });
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
    const {data} = await $host.get(`${CHARACTER_ENDPOINT}${id}`);
    return data;
}

/**
 * Функция возвращает массив персонажей с переданными  
 * в запросе идентификаторами.
 */
export const fetchMultipleCharacters = 
async (characterIds?: number[]): Promise<CharacterSchema[]> => {
    const { data } = 
        await $host.get(`${CHARACTER_ENDPOINT}/${characterIds.join(',') || ''}`)
    return data;
}
