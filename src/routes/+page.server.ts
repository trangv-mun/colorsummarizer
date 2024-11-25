import type {Actions} from './$types';
import { upload_api, imgbb_api_key } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
  default: async({ request, fetch }) => {
    const formData = Object.fromEntries(await request.formData());

    if (
      !(formData.photo as File).name ||
      (formData.photo as File).name === 'undefined'
    ) {
      return fail(400, {
        error: true,
        message: 'You must provide a file to upload'
      });
    }

    const { photo } = formData as { photo: File };

    const postFormData = new FormData();
    postFormData.append('image', photo);

    const resp = await fetch(`${upload_api}?key=${imgbb_api_key}`, {
      method: 'POST',
      body: postFormData
    });

    const data = await resp.json();

    redirect(302, `/summarizer?photo_url=${data.data.url}&clusters=${formData.clusters}&precision=${formData.precision}`)

  }
} satisfies Actions;