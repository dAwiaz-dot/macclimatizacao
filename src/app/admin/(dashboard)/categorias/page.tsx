import { getCategories } from "@/lib/categories";
import { deleteCategoryAction } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { CategoryForm } from "./CategoryForm";

export default async function CategoriasPage() {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="text-2xl font-bold text-mac-navy-800">Categorias</h1>
      <p className="mt-1 text-sm text-slate-500">
        Essas categorias aparecem para escolha ao cadastrar um produto. Adicione
        ou remova conforme a necessidade.
      </p>

      <div className="mt-8 rounded-2xl border border-mac-navy-100 bg-white p-6">
        <CategoryForm />
      </div>

      {categories.length === 0 ? (
        <p className="mt-8 text-sm text-slate-500">
          Nenhuma categoria cadastrada ainda.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-mac-navy-100 rounded-2xl border border-mac-navy-100 bg-white">
          {categories.map((category) => (
            <li
              key={category.id}
              className="flex items-center justify-between px-5 py-3.5"
            >
              <span className="text-sm font-medium text-mac-navy-800">
                {category.name}
              </span>
              <DeleteButton action={deleteCategoryAction.bind(null, category.id)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
