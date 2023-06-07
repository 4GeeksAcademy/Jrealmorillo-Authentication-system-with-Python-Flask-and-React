"""empty message

Revision ID: 70023c6b81b2
Revises: 14aed6f90472
Create Date: 2023-06-07 13:08:32.604346

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '70023c6b81b2'
down_revision = '14aed6f90472'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('is_active',
               existing_type=sa.BOOLEAN(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('is_active',
               existing_type=sa.BOOLEAN(),
               nullable=False)

    # ### end Alembic commands ###