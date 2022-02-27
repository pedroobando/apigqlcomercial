const User = require('../../mongodb/models/user');
const { EnumUserRoll } = require('../enumTypes');
const Condominio = require('../../mongodb/models/condominio');
// const PropertyType = require('../../mongodb/models/propertytype');
const { Property, PropertyType } = require('../../mongodb/models/property');
const Owner = require('../../mongodb/models/owner');
const CoinType = require('../../mongodb/models/cointype');
const { ConceptExpenseGroup } = require('../../mongodb/models/conceptexpense');
const { AuthenticationError, ApolloError } = require('apollo-server-express');

const messageErrorAuthorization = 'Usuario no autorizado..!';

const isUserAuthenticate = async (context) => {
  if (!context.auth.isAuthenticated) throw new AuthenticationError('not authenticated');
  return ({ uid } = context.auth);
  // return { activeUserId: uid, uid };
};

const UserfindById = async (uid) => {
  let userActive = undefined;
  userActive = await User.findById(uid);
  if (!userActive) throw new ApolloError('User not found', '404');
  return userActive;
};

const UserfindByIdAndUpdate = async (uid, userInput, condominioId = undefined) => {
  let userActive = null;
  try {
    userInput.condominioId = condominioId;
    userInput.updated_at = new Date.now();
    userActive = await User.findByIdAndUpdate(uid, userInput, { new: true });
  } catch (error) {
    throw new ApolloError('Error User not update', error);
  }
  return userActive;
};

const isExistsCondominio = async (condominioId) => {
  const theCondominio = await Condominio.findById(condominioId);
  if (!theCondominio) throw new Error('Registro del condominio no encontrado');
  return theCondominio;
};

const isAsignedProperty = async (condominioId, ownerId, propertiesId) => {
  const findOtherOwner = await Owner.findOne({
    _id: { $ne: ownerId },
    condominioId: condominioId,
    propertiesId: { $in: [...propertiesId] },
  });

  if (findOtherOwner) {
    const arrayOwnerPropertiesId = findOtherOwner.propertiesId.map((item) => item.toString());
    const intersection = arrayOwnerPropertiesId.filter((element) => propertiesId.includes(element));
    const _propertyFind = await Property.findById(intersection[0]);
    if (!_propertyFind) return undefined;
    const _propertyTypeFind = await PropertyType.findById(_propertyFind.propertyTypeId);
    if (!_propertyTypeFind) return undefined;
    throw new ApolloError(
      `[${_propertyTypeFind.name} ${_propertyFind.propertyName}] asignado ${findOtherOwner.ownerName}`
    );
  }
  return undefined;
};

const isExistsPropertyType = async (propertyTypeId) => {
  const thePrtType = await PropertyType.findById(propertyTypeId);
  if (!thePrtType) throw new Error('Registro del tipo de propiedad no encontrado');
  return thePrtType;
};

const isUserAdministrator = (activeUserId, theCondominio) => {
  const findActiveUser = theCondominio.users.find((item) => item === activeUserId);
  if (findActiveUser !== activeUserId) throw new ApolloError(messageErrorAuthorization, '403');

  // if (existsUserAdmin.roll !== EnumUserRoll.ADMIN)
  //   throw new ApolloError(messageErrorAuthorization, '403');
  // console.log(existsUserAdmin.roll);
  return true;
};

const retDataPaginate = (dataPaginate) => {
  const {
    totalDocs,
    limit,
    totalPages,
    page,
    pagingCounter,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
  } = dataPaginate;
  return {
    totalDocs,
    limit,
    totalPages,
    page,
    pagingCounter,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
  };
};

const retNewConceptExpenseGroup = async (conceptGroupName, uid, condominioId) => {
  try {
    if (conceptGroupName !== undefined) {
      _conceptGroup = {
        condominioId,
        conceptGroupName: conceptGroupName,
        order: 100,
        user_at: uid,
        updated_at: Date.now(),
      };
      const createConceptExpenseGrp = new ConceptExpenseGroup(_conceptGroup);
      await createConceptExpenseGrp.validate();
      await createConceptExpenseGrp.save();
      return createConceptExpenseGrp._id;
    }
    return undefined;
  } catch (error) {
    throw new Error(`Problema creado concepto grupo de gasto.`);
  }
};

const retNewCoinType = async (newCoinType) => {
  try {
    const coinType = new CoinType(newCoinType);
    await coinType.validate();
    await coinType.save();
    return coinType;
  } catch (error) {
    throw new Error(`Problema creado concepto grupo de gasto.`);
  }
};

// const isExistsConceptGroupExp = async (condominioId, conceptGroupId) => {
//   const existsConceptGroups = await ConceptGroupExp.findOne({ condominioId: condominioId });
//   if (!existsConceptGroups) throw new Error('Grupos para el condominio, no han sido creados');

//   const oneConceptGroup = existsConceptGroups.conceptGroups.id(conceptGroupId);
//   if (!oneConceptGroup) throw new Error('Problemas al localizar el grupo.');

//   const existsCondominio = await Condominio.findById(condominioId);
//   return { existsCondominio, existsConceptGroups };
// };

const isUserExistsCondominio = (userId, theCondominio) => {
  const userExists = theCondominio.users.find(
    (user) => user.userId.toString() === userId.toString()
  );
  if (userExists) throw new ApolloError('Usuario ya registrado en condominio');
  return userExists;
};

const isPropertyExistsCondominio = async (inmuebleName, condominioId, id = undefined) => {
  const propertyExists = await Property.findOne({ inmuebleName, condominioId });
  console.log(id, propertyExists.id);
  if (
    (propertyExists && typeof id === 'undefined') ||
    (propertyExists && typeof id !== 'undefined' && propertyExists.id !== id)
  )
    throw new ApolloError(`Inmueble ${inmuebleName}, ya ingresado.`);

  return propertyExists;
};

module.exports = {
  retDataPaginate,
  retNewCoinType,
  UserfindById,
  UserfindByIdAndUpdate,
  isAsignedProperty,
  isExistsCondominio,
  isExistsPropertyType,
  retNewConceptExpenseGroup,
  isPropertyExistsCondominio,
  isUserAdministrator,
  isUserAuthenticate,
  isUserExistsCondominio,
};
