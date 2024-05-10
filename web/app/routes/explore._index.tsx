import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import * as db from '../utils/db';
import TrailsComponent from "../components/Trails";
import { useEffect, useState } from "react";

export async function loader() {
  await db.seed();
  const data = await db.read(`
    MATCH (t:Trail)
    RETURN t
    `);
  return json(data.map(d => d.t.properties));
}

export async function action({
  request,
}: ActionFunctionArgs) {
  const body = await request.formData();
  await db.write(`
  CREATE (t:Trail {
    id: '${body.get('id')}',
    title: '${body.get('title')}'
  }) `);
  return json({ message: 'ok' });
}

export default function Explore() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const data = useLoaderData<typeof loader>();

  useEffect(() => {
    document.body.style.paddingTop = '100px';
    return () => document.body.style.backgroundColor = '#F8F8F8';
  }, []);

  useEffect(() => {
    setModalIsOpen(false);
  },[data]);

  return (
    <TrailsComponent trails={data} modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
  );
}