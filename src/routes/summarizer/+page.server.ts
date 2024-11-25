import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ fetch, setHeaders, url }) => {
  const imageUrl = url.searchParams.get('photo_url');

  if(imageUrl) {
    const clusters = url.searchParams.get('clusters');
    const precision = url.searchParams.get('precision');
  
     setHeaders({
      "cachecace-control": "max-age=86400"
     })
    const res = await fetch(`http://mkweb.bcgsc.ca/color-summarizer/?url=${imageUrl}&num_clusters=${clusters}&precision=${precision}&json=1`);
      const respData = await res.json();
      return {"image_url": imageUrl, ...respData};
  } else {
    throw redirect(302, '/');
  }
};
