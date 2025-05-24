const { gql, default: request } = require("graphql-request");

const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const GetCategory = async () => {
  const query = gql`
    query getCategories {
      categories {
        name
        id
        slug
        icon {
          url
        }
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};
const GetProducts = async () => {
  const query = gql`
    query Products {
      products {
        name
        id
        price
        image {
          url
        }
        longDescription {
          html
        }
        shortDesc
        category {
          id
        }
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};
const GetProductDetails = async (id) => {
  const query =
    gql`
      query getProductDetails {
        product(where: { id: "` +
    id +
    `" }) {
          id
          image {
            url
          }
          name
          longDescription {
            html
          }
          price
          shortDesc
          certifications {
            id
            name
            document {
                url
            }
          
          }
          tracking {
            name
            description
            id
            imagePlace {
              url
            }
          }
          
        }
      }
    `;

  const result = await request(MASTER_URL, query);
  return result;
};

export default {
  GetCategory,
  GetProducts,
  GetProductDetails,
};
