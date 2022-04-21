import {
  ActionIcon,
  Badge,
  Card,
  Group,
  Text,
  UnstyledButton,
} from "@mantine/core";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { ArrowRight } from "tabler-icons-react";
import { ISubscription } from "../../typings/Subscriptions";

interface IProps {
  sub: ISubscription;
}

export const Sub: FC<IProps> = ({ sub }) => {
  const router = useRouter();

  const getTimeNextPayment = () => {
    let iterator = sub.firstPayment;
    const now = dayjs(new Date());

    while (iterator.isBefore(now)) {
      iterator = iterator.add(sub.recurrenceCount, sub.recurrenceType);
    }

    return now.locale("fr").to(iterator);
  };

  return (
    <UnstyledButton
      onClick={() => router.push(`/${sub.id}`)}
      style={{
        margin: 10,
        minWidth: 300,
        maxWidth: 600,
        flexGrow: 1,
      }}
    >
      <Card shadow="sm" key={sub.id}>
        <Group position="apart" style={{ margin: 5 }}>
          <Text weight={500}>{sub.label}</Text>
          <Badge color={sub.color} variant="light">
            {sub.price.toFixed(2)}€
          </Badge>
        </Group>
        <Group position="apart" style={{ margin: 5 }}>
          <Text weight={500} color={sub.color} size="xs">
            Prochain paiement {getTimeNextPayment()}
          </Text>
          <ActionIcon
            variant="transparent"
            style={{ marginTop: 10, marginBottom: -5 }}
          >
            <ArrowRight strokeWidth={2} color={"black"} />
          </ActionIcon>
        </Group>
      </Card>
    </UnstyledButton>
  );
};
