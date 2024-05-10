import neo4j from "neo4j-driver";
const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = process.env;

const driver = neo4j.driver(
  NEO4J_URI,
  neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD)
);

export async function read(cypher: string, params = {}) {
  const session = driver.session();

  try {
    const res = await session.executeRead((tx) => tx.run(cypher, params));
    const values = res.records.map((record) => record.toObject());

    return values;
  } finally {
    await session.close();
  }
}

export async function write(cypher: string, params = {}) {
  const session = driver.session();

  try {
    const res = await session.executeWrite((tx) => tx.run(cypher, params));
    const values = res.records.map((record) => record.toObject());

    return values;
  } finally {
    await session.close();
  }
}

export async function seed() {
  try {
      const existingTrail = await read(`MATCH (t:Trail {id: 'trail-1'}) RETURN t`);
      if (!existingTrail.length) {
          await write(`
              CREATE (t:Trail {
                  id: 'trail-1',
                  title: 'Título da trilha'
              })
          `);
      } else {
          console.log('Já existe um registro com o ID especificado.');
      }
  } catch (e) {
      console.log(e);
  }
}