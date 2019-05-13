// import { SteedosSchema, SteedosOracleDriver, SteedosQueryOptions, SteedosDatabaseDriverType } from '../../../../src';
// import { expect } from 'chai';

// const connectString = process.env.DRIVER_ORACLE_ConnectString;//不提供connectString值时不运行单元测试
// const username = process.env.DRIVER_ORACLE_Username;
// const password = process.env.DRIVER_ORACLE_Password;
// const database = process.env.DRIVER_ORACLE_Database;
// let tableName = "TestPageForOracle";
// let driver: SteedosOracleDriver;

// describe('fetch records by paging for oracle database', () => {
//     if (!connectString) {
//         return true;
//     }
//     try {
//         require("oracledb");
//     }
//     catch (ex) {
//         return true;
//     }
//     let result: any;
//     let expected: any;
//     let testIndex: number = 0;

//     let tests = [
//         {
//             title: "top",
//             options: {
//                 fields: ["name"],
//                 sort: 'index',
//                 top: 2
//             },
//             expected: {
//                 length: 2
//             }
//         },
//         {
//             title: "skip",
//             options: {
//                 fields: ["id", "name"],
//                 sort: 'index',
//                 skip: 2
//             },
//             expected: {
//                 length: 2
//             }
//         },
//         {
//             title: "top without skip",
//             options: {
//                 fields: ["name"],
//                 top: 2
//             },
//             expected: {
//                 length: 2
//             }
//         },
//         {
//             title: "skip without top",
//             options: {
//                 fields: ["name"],
//                 skip: 3
//             },
//             expected: {
//                 length: 1
//             }
//         },
//         {
//             title: "top and skip for paging",
//             options: {
//                 fields: ["id", "name"],
//                 sort: 'index',
//                 top: 2,
//                 skip: 3
//             },
//             expected: {
//                 length: 1,
//                 firstRecordId: "ptr2"
//             }
//         },
//         {
//             title: "multi sort for paging",
//             options: {
//                 fields: ["id", "name"],
//                 sort: 'name desc,index',
//                 top: 2,
//                 skip: 1
//             },
//             expected: {
//                 length: 2,
//                 firstRecordId: "ptr2"
//             }
//         },
//         {
//             title: "filter for paging with endswith",
//             options: {
//                 fields: ["id", "name"],
//                 filters: [["name", "endswith", "pc"]],
//                 sort: 'id desc,index',
//                 top: 2,
//                 skip: 0
//             },
//             expected: {
//                 length: 2,
//                 firstRecordId: "cnpc2"
//             }
//         },
//         {
//             title: "filter for paging with notcontains",
//             options: {
//                 fields: ["id", "name"],
//                 filters: [["name", "notcontains", "pc"]],
//                 sort: 'id desc,index',
//                 top: 2,
//                 skip: 0
//             },
//             expected: {
//                 length: 2,
//                 firstRecordId: "ptr2"
//             }
//         },
//         {
//             title: "filter for paging with multi equal",
//             options: {
//                 fields: ["id", "name"],
//                 filters: [["name", "=", "cnpc"], ["title", "=", "CNPC"]],
//                 sort: 'id desc,index',
//                 top: 2,
//                 skip: 0
//             },
//             expected: {
//                 length: 2
//             }
//         }
//     ];

//     before(async () => {
//         let mySchema = new SteedosSchema({
//             datasources: {
//                 default: {
//                     connectString: connectString,
//                     username: username,
//                     password: password,
//                     database: database,
//                     driver: SteedosDatabaseDriverType.Oracle,
//                     logging: ["query", "error", "schema", "warn", "info", "log"],
//                     objects: {
//                         test: {
//                             label: 'Oracle Schema',
//                             tableName: tableName,
//                             fields: {
//                                 id: {
//                                     label: '主键',
//                                     type: 'text',
//                                     primary: true
//                                 },
//                                 name: {
//                                     label: '名称',
//                                     type: 'text'
//                                 },
//                                 title: {
//                                     label: '标题',
//                                     type: 'text'
//                                 },
//                                 index: {
//                                     label: '序号',
//                                     type: 'number'
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         });
//         const datasource = mySchema.getDataSource("default");
//         await datasource.createTables();
//         driver = <SteedosOracleDriver>datasource.adapter;
//     });

//     beforeEach(async () => {
//         await driver.insert(tableName, { id: "cnpc1", name: "cnpc", title: "CNPC", index: 1 });
//         await driver.insert(tableName, { id: "cnpc2", name: "cnpc", title: "CNPC", index: 2 });
//         await driver.insert(tableName, { id: "ptr1", name: "ptr", title: "PTR", index: 3 });
//         await driver.insert(tableName, { id: "ptr2", name: "ptr", title: "PTR", index: 4 });

//         let queryOptions: SteedosQueryOptions = tests[testIndex].options;
//         expected = tests[testIndex].expected;
//         try {
//             result = await driver.find(tableName, queryOptions);
//         }
//         catch(ex){
//             result = ex;
//         }
//     });

//     afterEach(async () => {
//         await driver.delete(tableName, "cnpc1");
//         await driver.delete(tableName, "cnpc2");
//         await driver.delete(tableName, "ptr1");
//         await driver.delete(tableName, "ptr2");
//     });

//     tests.forEach(async (test) => {
//         it(`${test.title}`, async () => {
//             testIndex++;
//             if (expected.error !== undefined) {
//                 expect(result.message).to.be.eq(expected.error);
//             }
//             if (expected.length !== undefined){
//                 expect(result).to.be.length(expected.length);
//             }
//             if (expected.firstRecordId !== undefined) {
//                 expect(result[0].id).to.be.eq(expected.firstRecordId);
//             }
//         });
//     });
// });
