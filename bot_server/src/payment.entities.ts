import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'Payment' })
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;
  // @Column({ type: 'text' })
  // owner: string;
  // @Column({ type: 'text' })
  // amount: number;
}
