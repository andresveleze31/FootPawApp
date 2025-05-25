
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

const GetOrdersUser = async (id) => {
  const query = gql`
    query GetOrdersUser {
      orders(where: { userid: "`+id+`" }) {
        id
        name
        phone
        productocantidad {
          product {
            id
            image {
              url
            }
            name
          }
          cantidad
        }
        total
        email
        country
        city
        adress
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

const GetOrderById = async (id) => {
  const query = gql`
    query GetOrderById {
      order(where: { id: "`+id+`" }) {
        adress
        city
        country
        email
        id
        name
        phone
        productocantidad {
          cantidad
          id
          product {
            id
            image {
              url
            }
            name
            price
          }
        }
        total
        zipcode
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

const CreateOrder = async (order) => {
  const mutation =
    gql`
    mutation CreateOrder {
      createOrder(
        data: {
          name: "` +
    order.name +
    `"
          email: "` +
    order.email +
    `"
          phone: ` +
    order.phone +
    `
          total: ` +
    order.total +
    `
          zipcode: "` +
    order.zip +
    `"
          country: "` +
    order.country +
    `"
          adress: "` +
    order.address +
    `"
          city: "` +
    order.city +
    `"  
    userid: "` +
    order.userid +
    `"
        }
      ) {
        id
      }
    }
  `;

  const result = await request(MASTER_URL, mutation);
  return result;
};

const UpdateOrderCantidad = async (producto) => {
  const mutation =
    gql`
    mutation UpdateOrderCantidad {
      updateOrder(
        data: {
          productocantidad: {
            create: { data: { product: { connect: { id: "` +
    producto.id +
    `" } }, cantidad: ` +
    producto.cantidad +
    ` } }
          }
        }
        where: { id: "` +
    producto.pedidoId +
    `" }
      ) {
        id
      }
      publishManyOrders(to: PUBLISHED) {
        count
      }
    }
  `;

  const result = await request(MASTER_URL, mutation);
  return result;
};

export default {
  GetCategory,
  GetProducts,
  GetProductDetails,
  CreateOrder,
  UpdateOrderCantidad,
  GetOrdersUser,
  GetOrderById,
};
