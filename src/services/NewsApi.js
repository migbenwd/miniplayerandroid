import axios from 'axios';
import { parse } from 'node-html-parser';
import { extractImagesWithTheirSource } from '../utils';

const apiBaseUrlAV = 'https://noticieroaltavoz.com/wp-json/wp/v2/posts/';

export const getNewsByCategoryId = async (categoryId) => {
  // return Promise<data>
  const url = `${apiBaseUrlAV}?categories=${categoryId}`;
  const response = await axios.get(url);
  return response.data;
};

export const fetchDiscoverNewsAV = async (id) => {
  return getNewsByCategoryId(id);
};

export const getCategories = async () => {
  const response = await fetch('https://noticieroaltavoz.com/');
  const html = await response.text();
  const parsed = parse(html, {
    blockTextElements: {
      script: false,
      noscript: true,
      style: true,
      pre: true,
    },
  });

  const itemsLiMenu = parsed
    .querySelector('.elementor-element-6d3dfb1')
    ?.querySelectorAll('li');
  const textItems = Array.from(itemsLiMenu).map((item) =>
    item.textContent.trim()
  );

  // console.log(textItems);

  const itemsLiMenu2 = parsed
    .querySelector('.elementor-element-70940b2')
    ?.querySelectorAll('li');
  const textItems2 = Array.from(itemsLiMenu2).map((item) =>
    item.textContent.trim()
  );

  // console.log(textItems2);

  const textItemsFinal = textItems.concat(textItems2);

  const arrayMenuWeb = textItemsFinal.map((element) => ({
    id: 1,
    title: element,
  }));

  /*
  console.log('............');
  console.log('arrayMenuWeb');
  console.log('............');
  console.log(arrayMenuWeb);
  */

  const result = await fetch(
    'https://noticieroaltavoz.com/wp-json/wp/v2/categories?per_page=12'
  )
    .then((resp) => {
      return resp.json();
    })
    .then((data) =>
      data.map((item) => ({
        id: item.id,
        title: item.name,
      }))
    );

  const arrayCategoriasApi = result;

  /*
  console.log('............');
  console.log('arrayCategoriasApi');
  console.log('............');
  console.log(arrayCategoriasApi);
  */

  // ----------------------- Hallar Coincidentes ...

  // Nuevo array para almacenar las coincidencias
  const arrayCategory = [];

  // Recorrer el arrayMenuWeb
  arrayMenuWeb.forEach((menuWebItem) => {
    // Buscar una coincidencia en arrayCategoriasApi
    const categoriaEncontrada = arrayCategoriasApi.find(
      (categoriaApi) => categoriaApi.title === menuWebItem.title
    );

    // Si se encuentra una coincidencia, agregarla al nuevo array
    if (categoriaEncontrada) {
      // Si el id es 331, colocarlo en la posición 3
      if (categoriaEncontrada.id === 331) {
        arrayCategory.splice(2, 0, categoriaEncontrada);
      } else {
        arrayCategory.push(categoriaEncontrada);
      }
    }
  });

  // Mostrar el nuevo array
  // console.log(arrayCategory);

  return arrayCategory;
};

export const getPublicidad = async () => {
  const url = `https://noticieroaltavoz.com/wp-json/wp/v2/publicidad-app`;
  const response = await axios.get(url);
  const htmlContent = response.data[0].content.rendered;

  return extractImagesWithTheirSource(htmlContent);
};
