import { Form } from '@remix-run/react';

import {
  Button,
  ErrorMessage,
  Field,
  Input,
  Select,
  Textarea,
} from '@oyster/ui';
import { toTitleCase } from '@oyster/utils';

import {
  ActivityPeriod,
  ActivityType,
  CreateActivityInput,
} from '@/modules/gamification/gamification.types';

// Components

const keys = CreateActivityInput.keyof().enum;

type ActivityFormProps = {
  activity?: Partial<CreateActivityInput>;
  error?: string;
  errors: Partial<Record<keyof CreateActivityInput, string>>;
};

const ACTIVITY_PERIODS = Object.values(ActivityPeriod);
const ACTIVITY_TYPES = Object.values(ActivityType);

export function ActivityForm({ activity, error, errors }: ActivityFormProps) {
  return (
    <Form className="form" method="post">
      <Field
        description="This will be visible to members."
        error={errors.name}
        label="Name"
        labelFor={keys.name}
        required
      >
        <Input
          defaultValue={activity?.name}
          id={keys.name}
          name={keys.name}
          required
        />
      </Field>

      <Field
        error={errors.description}
        label="Description"
        labelFor={keys.description}
      >
        <Textarea
          defaultValue={activity?.description || undefined}
          id={keys.description}
          name={keys.description}
        />
      </Field>

      <Field
        description="This tells our system to associate certain activities with certain events."
        error={errors.type}
        label="Type"
        labelFor={keys.type}
        required
      >
        <Select
          defaultValue={activity?.type}
          id={keys.type}
          name={keys.type}
          required
        >
          {ACTIVITY_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        description="This is the period of time that a member has to wait before completing this activity again."
        error={errors.period}
        label="Period"
        labelFor={keys.period}
      >
        <Select
          defaultValue={activity?.period || undefined}
          id={keys.period}
          name={keys.period}
        >
          {ACTIVITY_PERIODS.map((period) => (
            <option key={period} value={period}>
              {toTitleCase(period)}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        description="How many points will this activity be worth?"
        error={errors.points}
        label="Points"
        labelFor={keys.points}
        required
      >
        <Input
          defaultValue={activity?.points}
          id={keys.points}
          name={keys.points}
          required
          type="number"
        />
      </Field>

      <ErrorMessage>{error}</ErrorMessage>

      <Button.Group>
        <Button.Submit>Add</Button.Submit>
      </Button.Group>
    </Form>
  );
}
