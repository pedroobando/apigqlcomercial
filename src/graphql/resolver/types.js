const User = require('../../mongodb/models/user');
const { DocumentDet } = require('../../mongodb/models/document');
// const { PropertyType, Property } = require('../../mongodb/models/property');
// const Owner = require('../../mongodb/models/owner');
// const CoinType = require('../../mongodb/models/cointype');
// const { ConceptExpenseGrp, ConceptExpense } = require('../../mongodb/models/conceptexpense');
// const { ExpenseDetail } = require('../../mongodb/models/expense');

const types = {
  Document: {
    details: async (parent) =>  await DocumentDet.find({ documentId: parent.id })
    },
  },
  // Condominio: {
  //   coinType: async (parent) => await CoinType.findById(parent.coinTypeId),
  //   propertys: async (parent) => await Property.find({ condominioId: parent._id }),
  //   owners: async (parent) => await Owner.find({ condominioId: parent._id }),
  //   propertiesCount: async (parent) => await Property.count({ condominioId: parent._id }),
  //   ownersCount: async (parent) => await Owner.count({ condominioId: parent._id }),
  // },
  // Property: {
  //   propertyType: async (parent) => await PropertyType.findById(parent.propertyTypeId),
  //   propertyFullName: async (parent) => {
  //     const _propType = await PropertyType.findById(parent.propertyTypeId);
  //     if (_propType) return `${_propType.propertyTypeName} ${parent.propertyName}`;
  //     return '';
  //   },
  //   owner: async (parent) => {
  //     const _owners = await Owner.findById(parent.ownerId);
  //     return _owners ? _owners : undefined;
  //   },
  // },
  // Owner: {
  //   properties: async (parent) => await Property.find({ ownerId: parent._id }),
  //   propertiesCount: async (parent) => await Property.find({ ownerId: parent._id }).count(),
  // },
  // ConceptExpense: {
  //   conceptGroup: async (parent) => await ConceptExpenseGrp.findById(parent.conceptGroupId),
  // },
  // ConceptExpenseGrp: {
  //   conceptExpenses: async (parent) =>
  //     await ConceptExpense.find({ condominioId: parent.condominioId, conceptGroupId: parent._id }),
  // },
  // Expense: {
  //   expenseAmount: async (parent) => {
  //     const detailExpense = await ExpenseDetail.find({ expenseId: parent._id });
  //     // console.log(detailExpense);
  //     return 0;
  //   },
  //   details: async (parent) => await ExpenseDetail.find({ expenseId: parent._id }),
  // },
  // Todo: {
  //   user: async (parent) => {
  //     return await User.findById(parent.user);
  //   },
  //   userTo: async (parent) => {
  //     return await User.findById(parent.userTo);
  //   },
  //   product: async (parent) => {
  //     return await Product.findById(parent.product);
  //   },
  // },
  // Cliente: {
  // nombreCompleto: (parent) => parent.nombre + ' ' + parent.apellido,
  // nombre: String
  // apellido: String
  // empresa: String
  // email: String
  // telefono: String
  // vendedor: ID
  // creado: String
  // cliente:async (parent) => {
  //   let cursosLista: Array<any> = [];
  //   parent.courses.map((curso: string) => {
  //     cursosLista = [...cursosLista, database.cursos.find((elc) => elc.id == curso)];
  //     // cursosLista.push(_.filter(database.cursos, ['id', curso])[0]);
  //   });
  //   return cursosLista;
  // },
  // },
  // Curso: {
  //   students: (parent) => {
  //     const listaEstudiantes: Array<any> = [];
  //     const idCurso = parent.id;
  //     database.estudiantes.map((elEstudiante) => {
  //       if (elEstudiante.courses.filter((idc: any) => idc == idCurso).length > 0) {
  //         listaEstudiantes.push(elEstudiante);
  //       }
  //     });
  //     return listaEstudiantes;
  //   },
  //   path: (parent) => `https://www.udemy.com${parent.path}`,
  // },
};

module.exports = types;
