@extends('layouts.app')

@section('title', 'products:admin')

@section('css')
	<link href="/css/product/admin.css" rel="stylesheet">
@endsection

@section('js')
	<script src="/js/product/admin/crud.js"></script>
@endsection

@section('content')
	<table class="products table">
		<thead>
			<tr>
				<th>id</th>
				<th>type</th>
				<th>name</th>
				<th>price</th>
				<th>actions</th>
			</tr>
		</thead>
		<tbody>
			@foreach($products as $product)
				<tr>
					<td>{{ $product->id }}</td>
					<td>{{ $product->type }}</td>
					<td>{{ $product->name }}</td>
					<td>{{ $product->price }}</td>
					<td>
						<!-- Edit button. -->
						<a class="btn btn-sm btn-info" data-toggle="collapse" href="#product_{{ $product->id }}" role="button">Edit</a>
						<!-- Delete button. -->
						<a class="btn btn-sm btn-danger js_delete" target="_blank" href="{{ route('admin.product.delete', ['id' => $product->id]) }}">Delete</a>
					</td>
				</tr>
				<tr class="js_edit" data-id="{{ $product->id }}">
					<td colspan="100">
						<div class="collapse" id="product_{{ $product->id }}">
							@include('product.admin.create_update', [ 'product' => $product, 'url' => route('admin.product.update', ['id' => $product->id]) ])
						</div>
					</td>
				</tr>
			@endforeach
		</tbody>
	</table>
@endsection