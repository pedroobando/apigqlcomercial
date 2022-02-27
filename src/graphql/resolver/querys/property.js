const { Property, PropertyType } = require('../../../mongodb/models/property');
const Owner = require('../../../mongodb/models/owner');
const { ApolloError } = require('apollo-server-express');
const { isUserAuthenticate, retDataPaginate, isExistsCondominio } = require('../middleware');

const querys = {
  getProperty: async (_, { id }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const property = await Property.findById(id);
    if (!property) throw new ApolloError('Propiedad o inmueble no existente', '404');
    return property;
  },

  getProperties: async (_, { condid }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    try {
      const listProperties = (await Property.find({ condominioId: condid })) || [];
      return listProperties;
    } catch (error) {
      throw new ApolloError('Error en obtener datos de las propiedades');
    }
  },

  getPropertiesPaginate: async (_, { condid, page = 1, limit = 20 }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    await isExistsCondominio(condid);

    const options = {
      page,
      limit,
      sort: { propertyName: 1, propertyTypeId: 1 },
      // sort: { propertyTypeId: 1, [sortName]: sortASC },
      collation: {
        locale: 'en',
      },
    };

    try {
      const seekCondition = { condominioId: condid };
      const propertyPages = await Property.paginate(seekCondition, options);

      // const options2 = { sort: [{ 'propertyTypeName': 1 }] };
      // const propertyFind = await Property.find()
      //   .populate({
      //     path: 'propertyTypeId',
      //     select: 'propertyTypeName',
      //   })
      //   .sort({ propertyTypeName: 1 });
      // console.log(propertyFind);

      const retData = {
        docs: [...propertyPages.docs],
        paginate: retDataPaginate(propertyPages),
      };

      return retData;
    } catch (error) {
      throw new ApolloError('Error paginando datos de los inmuebles o propiedades');
    }
  },

  getPropertyType: async (_, { id }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const propertyType = await PropertyType.findById(id);
    if (!propertyType) throw new ApolloError('Moneda no tipo de propiedad', '404');
    return propertyType;
  },

  getPropertyTypes: async (_, { condid, active = true }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    try {
      const listCoinType = active
        ? await PropertyType.find({ condominioId: condid, active }).sort({ propertyTypeName: 1 })
        : await PropertyType.find({ condominioId: condid }).sort({ propertyTypeName: 1 });
      return listCoinType;
    } catch (error) {
      throw new ApolloError('Error en obtener datos de los tipo de propiedades');
    }
  },

  // getPropertiesOwnerFree: async (_, { condid }, ctx) => {
  //   const { uid } = await isUserAuthenticate(ctx);

  //   // Esta funcion no configo

  //   try {
  //     const listProperties = (await Property.find({ condominioId: condid })) || [];
  //     const listPropertiesFree = listProperties.map(async (item) => {
  //       const _existsOwner = await Owner.find({ condominioId: condid, propertiesId: item._id });
  //       return _existsOwner.length == 0 ? item : undefined;
  //     });

  //     return listPropertiesFree;
  //   } catch (error) {
  //     throw new ApolloError('Error en obtener datos de las propiedades');
  //   }
  // },

  // "Obtiene un grupo de propietario segun el ID"
  // getPropertyGroup(id: ID!): PropertyGroup
  // "Obtiene todos los grupos de propietarios segun el condominio ID"
  // getPropertyGroupByCond(condid: ID!): [PropertyGroup]

  // getPropertyGroup: async (_, { id }, ctx) => {
  //   const { activeUserId, activeUser } = await isUserAuthenticate(ctx);
  //   try {
  //     return await PropertyGroup.findById(id);
  //   } catch (error) {
  //     throw new ApolloError('Error en obtener datos de los Grupos de propietarios');
  //   }
  // },

  // getPropertyGroupByCond: async (_, { condid }, ctx) => {
  //   const { activeUserId, activeUser } = await isUserAuthenticate(ctx);
  //   try {
  //     return await PropertyGroup.find({ condominioId: condid });
  //   } catch (error) {
  //     throw new ApolloError('Error en obtener datos de los Grupos de propietarios');
  //   }
  // },
};

module.exports = querys;
