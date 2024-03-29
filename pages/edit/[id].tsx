import {
  ActionIcon,
  Button,
  Center,
  Group,
  InputWrapper,
  MultiSelect,
  NumberInput,
  Select,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ArrowLeft } from "tabler-icons-react";
import User from "../../components/User";
import { useSubcriptions } from "../../hooks/useSubcriptions";
import { useSubcription } from "../../hooks/useSubscription";
import { ISubscription } from "../../typings/Subscriptions";

const Create: NextPage = () => {
  const { subscriptions } = useSubcriptions({});
  const { loading, update } = useSubcription({});

  const router = useRouter();

  const subs = subscriptions.find((s) => s.id === router.query.id);

  const { getInputProps, setFieldValue, values, setValues } = useForm<
    Omit<ISubscription, "id">
  >({
    initialValues: {
      label: "",
      details: "",
      color: "",
      recurrenceType: "month",
      price: 0,
      recurrenceCount: 1,
      firstPayment: dayjs(),
      tags: [],
    },
    validate: {
      price: (v) =>
        v <= 0 ? "Ha bah, un abonnement qui donne de l'argent" : null,
    },
  });

  const theme = useMantineTheme();

  useEffect(() => {
    if (subs) {
      setValues({ ...subs });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subs]);

  if (!subs) return <>Nope</>;

  const swatches = Object.keys(theme.colors).map((color) => (
    <Center
      key={color}
      onClick={(e: any) => !loading && setFieldValue("color", color)}
      style={{
        backgroundColor: theme.colors[color][loading ? 1 : 4],
        width: 30,
        height: 30,
        borderRadius: 25,
        cursor: "pointer",
      }}
    >
      {getInputProps("color").value === color ? (
        <></>
      ) : (
        <div
          style={{
            width: 10,
            height: 10,
            backgroundColor: "white",
            borderRadius: 10,
          }}
        />
      )}
    </Center>
  ));

  const availableTagsFlat = [
    ...subscriptions.map((s) => s.tags),
    getInputProps("tags").value,
  ].flat();

  const availableTags = availableTagsFlat.filter((element, index) => {
    return availableTagsFlat.indexOf(element) === index;
  });

  const handleUpdate = async () => {
    await update({
      id: subs.id,
      ...values,
    });
    router.replace(`/${subs.id}`);
  };

  return (
    <div>
      <Head>
        <title>Edit - Subiby</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ padding: 10 }}>
        <User />
        <h2
          style={{
            marginLeft: 10,
            marginTop: 20,
            display: "flex",
            flexWrap: "nowrap",
          }}
        >
          <ActionIcon
            variant="transparent"
            style={{ marginRight: 10 }}
            onClick={() => router.replace(`/${subs.id}`)}
          >
            <ArrowLeft strokeWidth={3} color={"black"} />
          </ActionIcon>
          {getInputProps("label").value.length === 0
            ? "Création"
            : getInputProps("label").value}
        </h2>
        <div style={{ padding: 10 }}>
          <TextInput
            disabled={loading}
            label="Label"
            value={getInputProps("label").value}
            onChange={(e) => setFieldValue("label", e.target.value)}
          />
          <TextInput
            disabled={loading}
            label="Description"
            value={getInputProps("details").value}
            onChange={(e) => setFieldValue("details", e.target.value)}
          />
          <NumberInput
            disabled={loading}
            defaultValue={0}
            placeholder="Prix"
            label="Coût"
            value={getInputProps("price").value}
            precision={2}
            min={0}
            step={0.5}
            onChange={(e) => setFieldValue("price", !e ? 0 : e)}
          />
          <MultiSelect
            disabled={loading}
            label="Tags"
            data={availableTags}
            placeholder="Select items"
            searchable
            creatable
            value={getInputProps("tags").value}
            onChange={(e) => setFieldValue("tags", e)}
            getCreateLabel={(query) => `+ Créer ${query}`}
          />
          <InputWrapper label="Couleur">
            <Group
              position="center"
              spacing="xs"
              style={{ paddingLeft: 10, paddingRight: 10 }}
            >
              {swatches}
            </Group>
          </InputWrapper>
          <h3>Dates</h3>
          <DatePicker
            disabled={true}
            placeholder="Hier"
            label="Date premier prélèvement"
            value={getInputProps("firstPayment").value}
          />
          <Group style={{ marginTop: 20 }} noWrap>
            <span style={{ whiteSpace: "nowrap" }}>Paiement tous les </span>
            <NumberInput
              defaultValue={0}
              placeholder=""
              value={getInputProps("recurrenceCount").value}
              precision={0}
              min={1}
              step={1}
              style={{ width: 70, minWidth: 70 }}
              disabled={true}
            />
            <Select
              disabled={true}
              placeholder="Chaque mois"
              defaultValue="month"
              style={{ flexGrow: 1 }}
              value={getInputProps("recurrenceType").value}
              data={[
                { value: "year", label: "An" },
                { value: "month", label: "Mois" },
                { value: "day", label: "Jour" },
                { value: "hour", label: "Heure" },
                { value: "minute", label: "Minute" },
                { value: "second", label: "Seconde" },
              ]}
            />
          </Group>
          <Group position="right" style={{ marginTop: 20 }}>
            <Button variant="light" loading={loading} onClick={handleUpdate}>
              Modifier
            </Button>
          </Group>
        </div>
      </main>
    </div>
  );
};

export default Create;
