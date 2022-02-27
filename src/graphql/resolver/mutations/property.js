const { Property, PropertyType } = require('../../../mongodb/models/property');
const { getPropertyType } = require('../querys/property');
const { ApolloError } = require('apollo-server-express');
const { isExistsCondominio, isUserAuthenticate } = require('../middleware');

const mutation = {
  newProperty: async (_, { input }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const { condominioId, propertyTypeId } = input;

    await isExistsCondominio(condominioId);
    const thePropertyType = await getPropertyType('_', { id: propertyTypeId }, ctx);

    try {
      input.user_at = uid;
      input.updated_at = Date.now();
      const createProperty = new Property(input);
      await createProperty.validate();
      await createProperty.save();

      return createProperty;
    } catch (error) {
      if (error.code == 11000) {
        throw new Error(
          `${thePropertyType.name} ${input.propertyName} registrado con anterioridad, duplicidad en datos`
        );
      }
      throw new Error(`Problema ingresando datos de la propiedad!`);
    }
  },

  updateProperty: async (_, { id, input }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const { condominioId, propertyTypeId } = input;
    const thePropertyType = await getPropertyType('_', { id: propertyTypeId }, ctx);

    try {
      input.user_at = uid;
      input.updated_at = Date.now();
      const updateProperty = await Property.findByIdAndUpdate(id, input, { new: true });
      await updateProperty.validate();
      return updateProperty;
    } catch (error) {
      if (error.code == 11000) {
        throw new Error(
          `${thePropertyType.name} ${input.propertyName} registrado con anterioridad, duplicidad en datos`
        );
      }
      throw new Error(`Problema al actualizar los datos de la propiedad!`);
    }
  },

  removeProperty: async (_, { id }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const findProperty = await Property.findById(id);
    if (!findProperty) throw new ApolloError('Propiedad no fue encontrada');

    // const findOwner = await Owner.findOne({
    //   condominioId: findProperty.condominioId,
    //   propertiesId: { $in: id },
    // });
    // if (findOwner)
    //   throw new ApolloError(
    //     `Debe des afiliar la propiedad ${findProperty.propertyName} del propietario ${findOwner.ownerName}.`
    //   );

    try {
      await Property.findByIdAndDelete(id);
      return findProperty;
    } catch (error) {
      throw new Error(`Problemas intentar eliminar la propiedad ${findProperty.propertyName}!`);
    }
  },

  newPropertyType: async (_, { input }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);

    try {
      input.user_at = uid;
      const newPropertyType = new PropertyType(input);
      await newPropertyType.validate();
      await newPropertyType.save();

      return newPropertyType;
    } catch (error) {
      throw new Error(`Problema al ingresar los datos del tipo de propiedad..!`);
    }
  },

  updatePropertyType: async (_, { id, input }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);

    try {
      input.user_at = uid;
      input.updated_at = Date.now();
      const updPropertyType = await PropertyType.findByIdAndUpdate(id, input, { new: true });
      return updPropertyType;
    } catch (error) {
      throw new Error(`Problemas al actualizar los datos del tipo de propiedad..!`);
    }
  },

  removePropertyType: async (_, { id }, ctx) => {
    const { uid } = await isUserAuthenticate(ctx);
    const existsPropertyType = await PropertyType.findById(id);
    if (!existsPropertyType) throw new ApolloError('Tipo de propiedad no localizada.');

    try {
      await PropertyType.findByIdAndDelete(id);
      return existsPropertyType;
    } catch (error) {
      throw new Error(`Problema al eliminar el tipo de propiedad..!`);
    }
  },

  // newCondPropertyGroup: async (_, { condid, input }, ctx) => {
  //   const { activeUser, activeUserId } = await isUserAuthenticate(ctx);
  //   const existsCondominio = await isExistsCondominio(condid);
  //   isUserAdministrator(activeUser, existsCondominio.id);

  //   try {
  //     input.condominioId = existsCondominio.id;
  //     input.user_at = activeUserId;
  //     input.updated_at = Date.now();

  //     const newPropertyGroup = new PropertyGroup(input);
  //     await newPropertyGroup.validate();
  //     const savePropertyGroup = await newPropertyGroup.save();
  //     return savePropertyGroup;
  //   } catch (error) {
  //     throw new Error(`Problema al ingresar los datos..!`);
  //   }
  // },

  // updateCondPropertyGroup: async (_, { condid, id, input }, ctx) => {
  //   const { activeUserId, activeUser } = await isUserAuthenticate(ctx);
  //   const existsCondominio = await isExistsCondominio(condid);
  //   isUserAdministrator(activeUser, existsCondominio.id);

  //   try {
  //     input.user_at = activeUserId;
  //     input.updated_at = Date.now();

  //     const updatePtyGrp = await PropertyGroup.findByIdAndUpdate(id, input, {
  //       new: true,
  //     });
  //     await updatePtyGrp.validate();
  //     return updatePtyGrp;
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error(`Problema al actualizar los datos del inmueble..!`);
  //   }
  // },

  // removeCondPropertyGroup: async (_, { condid, id }, ctx) => {
  //   const { activeUser } = await isUserAuthenticate(ctx);
  //   const existsCondominio = await isExistsCondominio(condid);
  //   isUserAdministrator(activeUser, existsCondominio.id);

  //   let findProperty = await PropertyGroup.findById(id);
  //   if (!findProperty)
  //     throw new ApolloError('Registro del grupo del propietario no fue encontrado');

  //   try {
  //     const { name } = findProperty;
  //     await PropertyGroup.findByIdAndDelete(id);
  //     return `Grupo ${name} eliminado.`;
  //   } catch (error) {
  //     throw new Error(`Problema al eliminar los datos..!`);
  //   }
  // },
};

module.exports = mutation;
