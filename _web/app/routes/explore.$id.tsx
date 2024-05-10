import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import * as db from '../utils/db';
import { useEffect, useState } from "react";
import StepComponent from "../components/Steps";

export async function loader({
    params,
  }: LoaderFunctionArgs) {
  const trail = await db.read(`
    MATCH (t:Trail {id: '${params.id}'})
    RETURN t
  `)
  const data = await db.read(`
    MATCH (s:Step)-[:BELONGS_TO]->(t:Trail {id: '${params.id}'})
    RETURN s
  `);

  return json({trail: trail[0].t.properties, steps: data.map(d => d.s.properties)});
}

export async function action({
  request,
}: ActionFunctionArgs) {
  const body = await request.formData();

  await db.write(`
  CREATE (s:Step {
    id: '${body.get('id')}',
    title: '${body.get('title')}',
    content: '${body.get('content')}'
  }) `);

  await db.write(`
    MATCH (t:Trail {id: '${body.get('trail_id')}'})
    MATCH (s:Step {id: '${body.get('id')}'})
    CREATE (s)-[:BELONGS_TO]->(t)
  `);

  return json({ message: 'ok' });
}

export default function Explore() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { trail, steps } = useLoaderData<typeof loader>();

  useEffect(() => {
    document.body.style.paddingTop = '100px';
    return () => document.body.style.backgroundColor = '#F8F8F8';
  }, []);

  useEffect(() => {
    setModalIsOpen(false);
  },[steps]);

  return (
    <StepComponent title={trail.title} trailId={trail.id} steps={steps} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
  );
}